// Types for Maintenance API requests and responses
export interface MaintenanceRequestPayload {
  customerName: string
  customerPhone: string
  serviceType: "plumbing" | "electrical" | "ac" | "painting" | "carpentry" | "general"
  description: string
  priority: "low" | "medium" | "high"
}

export interface MaintenanceRequestResponse {
  success: boolean
  requestNumber?: string
  message?: string
  error?: string
  timestamp?: string
}

export interface QueryMaintenanceResponse {
  success: boolean
  data?: {
    requestNumber: string
    status: string
    createdDate: string
    serviceType: string
    customerName: string
    customerPhone: string
    priority: string
    description: string
  }
  error?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_MAINTENANCE_API_BASE_URL || "https://zrrffsjbfkphridqyais.supabase.co/functions/v1"
const API_KEY = process.env.NEXT_PUBLIC_MAINTENANCE_API_KEY

/**
 * Submit a maintenance request to the API
 */
export async function submitMaintenanceRequest(payload: MaintenanceRequestPayload): Promise<MaintenanceRequestResponse> {
  try {
    if (!API_KEY) {
      throw new Error("API key is not configured")
    }

    const response = await fetch(`${API_BASE_URL}/maintenance-gateway`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        customerName: payload.customerName,
        customerPhone: payload.customerPhone,
        serviceType: payload.serviceType,
        description: payload.description,
        priority: payload.priority,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to submit maintenance request",
      }
    }

    return {
      success: true,
      requestNumber: data.requestNumber || data.id,
      message: data.message || "Maintenance request submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting maintenance request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while submitting the request",
    }
  }
}

/**
 * Query maintenance request by request number
 */
export async function queryMaintenanceByNumber(requestNumber: string): Promise<QueryMaintenanceResponse> {
  try {
    if (!API_KEY) {
      throw new Error("API key is not configured")
    }

    const response = await fetch(`${API_BASE_URL}/query-maintenance-requests?requestNumber=${encodeURIComponent(requestNumber)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Request not found",
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    console.error("Error querying maintenance request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while querying the request",
    }
  }
}

/**
 * Query maintenance requests by phone number
 */
export async function queryMaintenanceByPhone(phoneNumber: string): Promise<QueryMaintenanceResponse> {
  try {
    if (!API_KEY) {
      throw new Error("API key is not configured")
    }

    const response = await fetch(`${API_BASE_URL}/query-maintenance-requests?phone=${encodeURIComponent(phoneNumber)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "No requests found for this phone number",
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    console.error("Error querying maintenance requests by phone:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while querying the requests",
    }
  }
}

/**
 * Service type translation helper
 */
export const serviceTypeLabels = {
  ar: {
    plumbing: "سباكة",
    electrical: "كهربائية",
    ac: "تكييف",
    painting: "دهان",
    carpentry: "نجارة",
    general: "صيانة عامة",
  },
  en: {
    plumbing: "Plumbing",
    electrical: "Electrical",
    ac: "Air Conditioning",
    painting: "Painting",
    carpentry: "Carpentry",
    general: "General Maintenance",
  },
}

/**
 * Priority level translation helper
 */
export const priorityLabels = {
  ar: {
    low: "منخفض",
    medium: "متوسط",
    high: "عالي",
  },
  en: {
    low: "Low",
    medium: "Medium",
    high: "High",
  },
}
