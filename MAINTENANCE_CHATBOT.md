# Maintenance Chatbot Integration Guide

## Overview

The Alazab website now includes an intelligent chatbot that handles customer inquiries and facilitates maintenance requests through the Alazab Maintenance API. The chatbot is fully bilingual (Arabic/English) and provides a seamless experience for customers to submit maintenance requests and track their status.

## Features

### 1. **Smart Request Detection**
- The chatbot automatically detects maintenance requests through:
  - **Keyword Detection**: Recognizes Arabic keywords (صيانة, تصليح, إصلاح, سباكة, كهربائية, تكييف) and English keywords (maintenance, repair, fix, plumbing, electrical, ac, painting, carpentry)
  - **Direct User Input**: Allows customers to directly type service requests

### 2. **Multi-Step Maintenance Form**
When a maintenance request is detected, the chatbot guides customers through:
1. **Name Collection**: Full name of the customer
2. **Phone Number**: Contact phone number
3. **Service Type**: Selection from:
   - Plumbing (سباكة)
   - Electrical (كهربائية)
   - Air Conditioning (تكييف)
   - Painting (دهان)
   - Carpentry (نجارة)
   - General Maintenance (صيانة عامة)
4. **Description**: Detailed description of the problem
5. **Priority Level**: Choice of Low (منخفض), Medium (متوسط), or High (عالي)

### 3. **Request Submission & Tracking**
- Submits request to Alazab Maintenance API
- Provides confirmation with Request Number
- Enables tracking of submitted requests
- Displays status and confirmation messages

### 4. **Bilingual Support**
- Full Arabic/English support
- Dynamic language switching based on user preferences
- All messages, form labels, and responses translated

## Technical Architecture

### Files

1. **`/lib/maintenance-api.ts`**
   - TypeScript wrapper for API communication
   - Exports functions:
     - `submitMaintenanceRequest()`: Submit new maintenance requests
     - `queryMaintenanceByNumber()`: Query request by request number
     - `queryMaintenanceByPhone()`: Query requests by phone number
   - Handles all API calls with proper error handling

2. **`/components/smart-chatbot.tsx`**
   - React component managing chatbot UI and logic
   - Implements:
     - Message history with animations
     - Maintenance form state management
     - Keyword detection for automatic flow triggering
     - Multi-step form navigation
     - Real-time response generation

3. **`.env.local`**
   - Configuration for API endpoints and authentication

### Environment Variables

```
NEXT_PUBLIC_MAINTENANCE_API_BASE_URL=https://zrrffsjbfkphridqyais.supabase.co/functions/v1
NEXT_PUBLIC_MAINTENANCE_API_KEY=<your_api_key>
```

## API Integration

### Maintenance Request Submission

**Endpoint**: `POST /maintenance-gateway`

**Request Payload**:
```json
{
  "customerName": "string",
  "customerPhone": "string",
  "serviceType": "plumbing|electrical|ac|painting|carpentry|general",
  "description": "string",
  "priority": "low|medium|high"
}
```

**Response**:
```json
{
  "success": true,
  "requestNumber": "string",
  "message": "string"
}
```

### Query Request by Number

**Endpoint**: `GET /query-maintenance-requests?requestNumber=<number>`

### Query Requests by Phone

**Endpoint**: `GET /query-maintenance-requests?phone=<phone>`

## Usage Examples

### User Initiates Maintenance Request

1. User opens chatbot and types: "I need plumbing repair"
2. Chatbot detects maintenance keyword and asks for name
3. User provides information step-by-step
4. Chatbot submits to API and displays confirmation with request number

### Bilingual Interaction

- **Arabic**: User types "أحتاج صيانة الكهرباء" → Chatbot responds in Arabic
- **English**: User types "I need AC repair" → Chatbot responds in English

## Maintenance State Flow

```
Initial → Detect Maintenance → Name Input → Phone Input → 
Service Selection → Description → Priority → Submit → 
Success/Error Response
```

## Customization

### Adding New Service Types

Edit `/lib/maintenance-api.ts`:
```typescript
serviceType: "plumbing" | "electrical" | "ac" | "painting" | "carpentry" | "general" | "newService"
```

Update service labels:
```typescript
export const serviceTypeLabels = {
  ar: {
    newService: "الخدمة الجديدة"
  },
  en: {
    newService: "New Service"
  }
}
```

### Customizing Form Steps

Edit `/components/smart-chatbot.tsx` to modify the maintenance form flow in the `handleMaintenanceRequest()` function.

## Error Handling

The chatbot includes comprehensive error handling:
- API connectivity errors
- Missing API key validation
- Invalid input validation
- User-friendly error messages in both languages

## Security

- API key stored as environment variable
- All API calls use HTTP-only headers
- Request validation before submission
- Phone number and customer data handled securely

## Testing

To test the maintenance chatbot:

1. Open the website and locate the chatbot in the bottom-right corner
2. Type "صيانة" (Arabic) or "maintenance" (English)
3. Follow the prompts to submit a test request
4. Verify the request number is returned
5. Test with different service types and priority levels

## Troubleshooting

### Chatbot Not Responding
- Check if `NEXT_PUBLIC_MAINTENANCE_API_KEY` is set in environment variables
- Verify API endpoint is accessible
- Check browser console for error messages

### Requests Not Submitting
- Ensure all required fields are filled
- Check API key validity
- Verify network connectivity
- Review API response in browser DevTools

### Language Not Switching
- Verify language context is properly initialized
- Check if language preference is saved
- Clear browser cache if needed

## Future Enhancements

Potential improvements:
- Image/file upload for maintenance issues
- Real-time status updates via WebSocket
- Customer dashboard to track all requests
- Admin panel for request management
- Integration with SMS notifications
- WhatsApp chatbot integration
