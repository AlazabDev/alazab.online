export type MaintenanceServiceType = "plumbing" | "electrical" | "ac" | "painting" | "carpentry" | "general"
export type MaintenancePriority = "low" | "medium" | "high"

export interface MaintenanceRequestPayload {
  customerName: string
  customerPhone: string
  serviceType: string
  description: string
  priority: MaintenancePriority
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

const VALID_SERVICES = new Set<MaintenanceServiceType>([
  "plumbing",
  "electrical",
  "ac",
  "painting",
  "carpentry",
  "general",
])

function isMaintenanceService(value: string): value is MaintenanceServiceType {
  return VALID_SERVICES.has(value as MaintenanceServiceType)
}

async function postInternal<T>(body: Record<string, unknown>): Promise<T> {
  const response = await fetch("/api/maintenance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Maintenance request failed")
  }
  return data as T
}

export async function submitMaintenanceRequest(payload: MaintenanceRequestPayload): Promise<MaintenanceRequestResponse> {
  try {
    if (!isMaintenanceService(payload.serviceType)) {
      return { success: false, error: "Invalid maintenance service" }
    }

    return await postInternal<MaintenanceRequestResponse>({
      operation: "submit",
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      serviceType: payload.serviceType,
      description: payload.description,
      priority: payload.priority,
    })
  } catch (error) {
    console.error("Error submitting maintenance request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while submitting the request",
    }
  }
}

export async function queryMaintenanceByNumber(requestNumber: string): Promise<QueryMaintenanceResponse> {
  try {
    return await postInternal<QueryMaintenanceResponse>({
      operation: "query-number",
      requestNumber,
    })
  } catch (error) {
    console.error("Error querying maintenance request:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while querying the request",
    }
  }
}

export async function queryMaintenanceByPhone(phoneNumber: string): Promise<QueryMaintenanceResponse> {
  try {
    return await postInternal<QueryMaintenanceResponse>({
      operation: "query-phone",
      phone: phoneNumber,
    })
  } catch (error) {
    console.error("Error querying maintenance requests by phone:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while querying the requests",
    }
  }
}

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
