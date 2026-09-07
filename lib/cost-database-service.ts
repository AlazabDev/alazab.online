import { createClient } from "@/lib/supabase/client"
import type { ProjectEstimate, CostItem } from "./cost-calculator-service"

const TABLE_ESTIMATES = "cost_estimates"
const TABLE_ITEMS = "cost_estimate_items"
const TABLE_COMPARISONS = "cost_comparisons"

export class CostDatabaseService {
  private static async authenticatedClient() {
    const supabase = createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new Error("Authentication required")
    }

    return { supabase, user }
  }

  /**
   * إنشاء عرض جديد
   */
  static async createEstimate(estimate: Omit<ProjectEstimate, "id" | "createdAt" | "updatedAt">) {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data, error } = await supabase
        .from(TABLE_ESTIMATES)
        .insert([
          {
            user_id: user.id,
            title: estimate.title,
            title_ar: estimate.titleAr,
            project_type: estimate.projectType,
            area: estimate.area,
            location: estimate.location,
            finishing_type: estimate.finishingType,
            notes: estimate.notes,
            notes_ar: estimate.notesAr,
            materials_cost: estimate.breakdown.materials,
            labor_cost: estimate.breakdown.labor,
            finishing_cost: estimate.breakdown.finishing,
            additional_cost: estimate.breakdown.additionalCosts,
            subtotal: estimate.breakdown.subtotal,
            tax: estimate.breakdown.tax,
            total_cost: estimate.breakdown.total,
          },
        ])
        .select()

      if (error) throw error

      if (data && data[0] && estimate.items.length > 0) {
        const estimateId = data[0].id
        const itemsResult = await this.addEstimateItems(estimateId, estimate.items)
        if (!itemsResult.success) {
          await supabase.from(TABLE_ESTIMATES).delete().eq("id", estimateId)
          throw new Error("Unable to save estimate items")
        }
      }

      return { success: true, estimateId: data?.[0]?.id }
    } catch (error) {
      console.error("Error creating estimate:", error)
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  /**
   * إضافة عناصر للعرض
   */
  static async addEstimateItems(estimateId: string, items: CostItem[]) {
    try {
      const { supabase } = await this.authenticatedClient()
      const itemsData = items.map((item) => ({
        estimate_id: estimateId,
        item_name: item.name,
        item_name_ar: item.nameAr,
        category: item.category,
        unit: item.unit,
        unit_ar: item.unitAr,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.totalPrice || item.quantity * item.unitPrice,
      }))

      const { error } = await supabase.from(TABLE_ITEMS).insert(itemsData)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Error adding items:", error)
      return { success: false, error }
    }
  }

  /**
   * الحصول على جميع العروض
   */
  static async getAllEstimates() {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data, error } = await supabase
        .from(TABLE_ESTIMATES)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      return { success: true, estimates: data || [] }
    } catch (error) {
      console.error("Error fetching estimates:", error)
      return { success: false, error, estimates: [] }
    }
  }

  /**
   * الحصول على عرض محدد
   */
  static async getEstimate(estimateId: string) {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data: estimateData, error: estimateError } = await supabase
        .from(TABLE_ESTIMATES)
        .select("*")
        .eq("id", estimateId)
        .eq("user_id", user.id)
        .single()

      if (estimateError) throw estimateError

      const { data: itemsData, error: itemsError } = await supabase
        .from(TABLE_ITEMS)
        .select("*")
        .eq("estimate_id", estimateId)

      if (itemsError) throw itemsError

      return { success: true, estimate: estimateData, items: itemsData || [] }
    } catch (error) {
      console.error("Error fetching estimate:", error)
      return { success: false, error }
    }
  }

  /**
   * تحديث عرض
   */
  static async updateEstimate(estimateId: string, updates: Partial<ProjectEstimate>) {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data, error } = await supabase
        .from(TABLE_ESTIMATES)
        .update({
          title: updates.title,
          title_ar: updates.titleAr,
          project_type: updates.projectType,
          area: updates.area,
          finishing_type: updates.finishingType,
          notes: updates.notes,
          notes_ar: updates.notesAr,
          materials_cost: updates.breakdown?.materials,
          labor_cost: updates.breakdown?.labor,
          finishing_cost: updates.breakdown?.finishing,
          additional_cost: updates.breakdown?.additionalCosts,
          subtotal: updates.breakdown?.subtotal,
          tax: updates.breakdown?.tax,
          total_cost: updates.breakdown?.total,
          updated_at: new Date(),
        })
        .eq("id", estimateId)
        .eq("user_id", user.id)
        .select()

      if (error) throw error
      return { success: true, estimate: data?.[0] }
    } catch (error) {
      console.error("Error updating estimate:", error)
      return { success: false, error }
    }
  }

  /**
   * حذف عرض
   */
  static async deleteEstimate(estimateId: string) {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data: ownedEstimate, error: ownershipError } = await supabase
        .from(TABLE_ESTIMATES)
        .select("id")
        .eq("id", estimateId)
        .eq("user_id", user.id)
        .single()

      if (ownershipError || !ownedEstimate) throw new Error("Estimate not found")

      await supabase.from(TABLE_ITEMS).delete().eq("estimate_id", estimateId)
      const { error } = await supabase.from(TABLE_ESTIMATES).delete().eq("id", estimateId).eq("user_id", user.id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Error deleting estimate:", error)
      return { success: false, error }
    }
  }

  /**
   * إنشاء مقارنة بين عرضين
   */
  static async createComparison(estimateId1: string, estimateId2: string, notes?: string) {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data: ownedEstimates, error: ownershipError } = await supabase
        .from(TABLE_ESTIMATES)
        .select("id")
        .in("id", [estimateId1, estimateId2])
        .eq("user_id", user.id)

      if (ownershipError || !ownedEstimates || ownedEstimates.length !== 2) {
        throw new Error("Both estimates must belong to the current user")
      }

      const { data, error } = await supabase
        .from(TABLE_COMPARISONS)
        .insert([
          {
            user_id: user.id,
            estimate_id_1: estimateId1,
            estimate_id_2: estimateId2,
            notes: notes?.slice(0, 2000),
          },
        ])
        .select()

      if (error) throw error
      return { success: true, comparisonId: data?.[0]?.id }
    } catch (error) {
      console.error("Error creating comparison:", error)
      return { success: false, error }
    }
  }

  /**
   * الحصول على المقارنات
   */
  static async getComparisons() {
    try {
      const { supabase, user } = await this.authenticatedClient()
      const { data, error } = await supabase
        .from(TABLE_COMPARISONS)
        .select("*")
        .eq("user_id", user.id)

      if (error) throw error
      return { success: true, comparisons: data || [] }
    } catch (error) {
      console.error("Error fetching comparisons:", error)
      return { success: false, error }
    }
  }

  static exportEstimateAsJSON(estimate: ProjectEstimate): string {
    return JSON.stringify(estimate, null, 2)
  }

  static importEstimateFromJSON(jsonString: string): ProjectEstimate | null {
    try {
      const estimate = JSON.parse(jsonString)
      return estimate as ProjectEstimate
    } catch {
      return null
    }
  }
}
