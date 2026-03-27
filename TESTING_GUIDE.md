# Maintenance Chatbot - Testing Guide

## Pre-Test Checklist

- [ ] API key is set in environment variables: `NEXT_PUBLIC_MAINTENANCE_API_KEY`
- [ ] Application is running locally or deployed
- [ ] Browser console is open (F12 or Right-click → Inspect)
- [ ] Network tab is open to monitor API calls

## Test Scenario 1: Basic Keyword Detection (English)

### Test Case 1.1: Simple Maintenance Request
**Steps:**
1. Open chatbot (click yellow button bottom-right)
2. Type: `I need maintenance`
3. Press Enter

**Expected Results:**
- ✅ Chatbot responds: "Thank you! I'll help you submit a maintenance request. First, what's your full name?"
- ✅ Chatbot enters "name" step
- ✅ Message displays in bot's color (gray)
- ✅ User message displays in yellow

### Test Case 1.2: Repair Keyword
**Steps:**
1. Clear chatbot
2. Type: `I need plumbing repair`
3. Press Enter

**Expected Results:**
- ✅ Chatbot recognizes "repair" keyword
- ✅ Transitions to name collection step
- ✅ Prompt appears in English

### Test Case 1.3: Direct Service Request
**Steps:**
1. Type: `plumbing help needed`
2. Press Enter

**Expected Results:**
- ✅ Detects "plumbing" keyword
- ✅ Transitions to maintenance form
- ✅ Requests customer name

## Test Scenario 2: Arabic Keywords

### Test Case 2.1: Arabic Maintenance Word
**Steps:**
1. Clear chatbot
2. Type: `أحتاج صيانة` (I need maintenance)
3. Press Enter

**Expected Results:**
- ✅ Chatbot responds in Arabic: "شكراً لك! سأساعدك في تقديم طلب صيانة. أولاً، ما اسمك الكامل؟"
- ✅ All subsequent messages in Arabic
- ✅ Form labels in Arabic

### Test Case 2.2: Arabic Service Type
**Steps:**
1. Wait for name prompt
2. Type: `محمد أحمد` (Mohamed Ahmed)
3. Press Enter

**Expected Results:**
- ✅ Name accepted
- ✅ Prompt: "الآن، ما رقم هاتفك؟" (What's your phone number?)

## Test Scenario 3: Complete Form Submission (English)

### Steps:

**Step 1: Name**
```
User: "My name is John Smith"
Bot: "Thanks! Now, what's your phone number?"
✅ Expected: Chatbot advances to phone step
```

**Step 2: Phone**
```
User: "+966501234567"
Bot: "What type of service do you need? (Plumbing, Electrical, AC, Painting, Carpentry, or General Maintenance)"
✅ Expected: Chatbot advances to service selection
```

**Step 3: Service Type**
```
User: "plumbing"
Bot: "Now, please describe the problem or service you need:"
✅ Expected: Chatbot recognizes service type, advances to description
```

**Step 4: Description**
```
User: "There's a water leak under the sink"
Bot: "What's the priority level? (Low, Medium, or High)"
✅ Expected: Chatbot advances to priority selection
```

**Step 5: Priority**
```
User: "high"
Bot: "Submitting your request now..."
✅ Expected: Chatbot shows loading state
```

**Step 6: Confirmation**
```
Bot: "✅ Your request has been received successfully!

Request Number: REQ-2024-001234

Our team will contact you shortly to confirm the service details."
✅ Expected: 
- Confirmation message appears
- Request number is displayed
- Success indicator (✅) shown
```

## Test Scenario 4: Complete Form Submission (Arabic)

### Steps:

**Step 1: Name (Arabic)**
```
User: "أحمد محمد علي"
Bot: "شكراً! الآن، ما رقم هاتفك؟"
✅ Expected: Arabic prompts throughout
```

**Step 2: Phone (Arabic)**
```
User: "+966501234567"
Bot: "ما نوع الخدمة التي تحتاجها؟ (سباكة، كهربائية، تكييف، دهان، نجارة، أو صيانة عامة)"
✅ Expected: Service options in Arabic
```

**Step 3: Service Type (Arabic)**
```
User: "سباكة"
Bot: "الآن، يرجى وصف المشكلة أو الخدمة التي تحتاجها:"
✅ Expected: Arabic description prompt
```

**Step 4: Description (Arabic)**
```
User: "تسريب مياه من تحت الحوض"
Bot: "ما مستوى الأولوية؟ (منخفض، متوسط، أو عالي)"
✅ Expected: Arabic priority options
```

**Step 5: Priority (Arabic)**
```
User: "عالي"
Bot: "جاري إرسال طلبك الآن..."
✅ Expected: Arabic loading message
```

**Step 6: Confirmation (Arabic)**
```
Bot: "✅ تم استلام طلبك بنجاح!

رقم الطلب: REQ-2024-001234

سيتواصل معك فريقنا قريباً لتأكيد تفاصيل الخدمة."
✅ Expected: 
- Full Arabic confirmation
- Request number displayed
- Success indicator shown
```

## Test Scenario 5: Service Type Recognition

### Test different service types:

| Input | Expected Service |
|-------|-----------------|
| "plumbing" | plumbing |
| "سباكة" | plumbing |
| "electrical" | electrical |
| "كهربائية" | electrical |
| "ac repair" | ac |
| "تكييف" | ac |
| "painting" | painting |
| "دهان" | painting |
| "carpentry" | carpentry |
| "نجارة" | carpentry |
| "general maintenance" | general |
| "صيانة عامة" | general |

**Expected Results:**
- ✅ All service types recognized
- ✅ Both English and Arabic keywords detected
- ✅ Mixed language inputs handled gracefully

## Test Scenario 6: Priority Recognition

### Test different priority inputs:

| Input | Expected Priority |
|-------|-----------------|
| "low" | low |
| "منخفض" | low |
| "medium" | medium |
| "متوسط" | medium |
| "high" | high |
| "عالي" | high |

**Expected Results:**
- ✅ All priorities recognized
- ✅ Case insensitive
- ✅ Both languages supported

## Test Scenario 7: Error Handling

### Test 7.1: Missing API Key
**Setup:**
1. Remove `NEXT_PUBLIC_MAINTENANCE_API_KEY` from environment

**Steps:**
1. Submit a complete maintenance form
2. Check bot response

**Expected Results:**
- ✅ Bot shows error: "Error: API key is not configured"
- ✅ Form state resets
- ✅ User can retry

### Test 7.2: Invalid API Endpoint
**Setup:**
1. Change API_BASE_URL to invalid endpoint

**Steps:**
1. Submit a complete maintenance form
2. Check console for error

**Expected Results:**
- ✅ User sees: "Connection error. Please try again later."
- ✅ Bot response in correct language
- ✅ Form resets for retry

### Test 7.3: Network Error
**Setup:**
1. Disable network while submitting (DevTools → Offline)

**Steps:**
1. Submit form while offline
2. Check response

**Expected Results:**
- ✅ Error message displays
- ✅ Form resets
- ✅ User can enable network and retry

## Test Scenario 8: Conversation Continuity

### Steps:
1. Submit maintenance request successfully
2. Type: "Tell me about your services"
3. Press Enter

**Expected Results:**
- ✅ Bot responds with general service information
- ✅ Regular chatbot mode resumes
- ✅ Can submit another maintenance request if needed

## Test Scenario 9: Mobile Responsiveness

### On Mobile Device:
1. Open website on phone
2. Locate chatbot (should be bottom-right)
3. Tap chatbot button
4. Test typing in form fields
5. Test sending messages

**Expected Results:**
- ✅ Chatbot window visible on screen
- ✅ Input field accessible
- ✅ Messages display correctly
- ✅ Form flows naturally
- ✅ No overflow or layout issues

## Test Scenario 10: Language Switching

### Steps:
1. Start with English chatbot
2. Submit form in English
3. Use language toggle (if available)
4. Reload page
5. Start new conversation in Arabic

**Expected Results:**
- ✅ Language preference persists
- ✅ All messages in selected language
- ✅ Form labels translated
- ✅ Can switch between languages

## API Testing

### Monitor API Calls in DevTools:

1. Open DevTools → Network tab
2. Submit maintenance form
3. Look for request to: `maintenance-gateway`

**Expected API Call:**
```
POST https://zrrffsjbfkphridqyais.supabase.co/functions/v1/maintenance-gateway
Status: 200 OK
Headers include: x-api-key
Response: { success: true, requestNumber: "..." }
```

### Test Response Times:
- ✅ API should respond within 2-3 seconds
- ✅ No timeout errors
- ✅ Consistent performance

## Browser Testing

### Test on Different Browsers:

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Test | Latest version |
| Firefox | ✅ Test | Latest version |
| Safari | ✅ Test | Latest version |
| Edge | ✅ Test | Latest version |

## Performance Testing

### Load Test:
1. Submit 5+ requests in quick succession
2. Monitor API response times
3. Check for rate limiting

**Expected Results:**
- ✅ All requests processed
- ✅ No significant delays
- ✅ Consistent performance

## Accessibility Testing

### Keyboard Navigation:
1. Tab through chatbot interface
2. Use Enter to send messages
3. Verify all interactive elements accessible

**Expected Results:**
- ✅ All elements tab-reachable
- ✅ Enter key sends messages
- ✅ Screen reader compatible

## Success Criteria

✅ All tests pass when:
- Maintenance requests successfully submitted
- Request numbers generated and displayed
- Both English and Arabic fully supported
- Error handling graceful and user-friendly
- Mobile responsive and accessible
- Performance acceptable
- API integration working
- Form validation complete
- Language switching functional

## Reporting Issues

If any test fails:

1. **Screenshot**: Capture error state
2. **Browser Console**: Copy error messages
3. **Network Tab**: Check API response
4. **Steps to Reproduce**: Document exactly how to replicate
5. **Environment**: Note API key status, browser, mobile/desktop
6. **Expected vs Actual**: Describe difference

## Post-Testing Checklist

- [ ] All test scenarios completed
- [ ] No console errors or warnings
- [ ] API calls successful
- [ ] All translations present
- [ ] Mobile responsive
- [ ] Error handling working
- [ ] Performance acceptable
- [ ] Ready for production deployment

---

**Test Environment**: v0 Development
**Date**: March 27, 2026
**Status**: Ready for Testing
