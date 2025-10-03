# Test Tour Guide Credentials

## Test Guide 1 - Safari Expert
**Email**: sarah.guides@example.com  
**Password**: TestGuide2024!  
**Name**: Sarah Johnson  
**Location**: Nairobi, Kenya  
**Specialization**: Wildlife Safari, Photography Tours  
**Hourly Rate**: $85/hour  
**Experience**: 8 years  

## Test Guide 2 - Cultural Tours
**Email**: miguel.cultural@example.com  
**Password**: TestGuide2024!  
**Name**: Miguel Rodriguez  
**Location**: Barcelona, Spain  
**Specialization**: Cultural Tours, Historical Sites, Food Tours  
**Hourly Rate**: $65/hour  
**Experience**: 6 years  

## How to Create These Test Accounts

1. **Go to your Supabase Dashboard** → Authentication → Users
2. **Click "Add User"** and create each user with the emails and passwords above
3. **Once created**, the profiles and guide records will be automatically created via the database trigger
4. **Or** use the signup flow in your app to create these accounts

## After Creating Accounts

1. Log in as each guide
2. Complete their profile in the Dashboard
3. Upload profile pictures to the `profile-images` bucket
4. Set calendar availability
5. Admin needs to approve the guide profiles (set `is_approved = true` in guides table)

## Testing Messaging

1. Create a third test account as a tourist/traveler
2. Use that account to contact the guides
3. Log in as the guides to see and respond to messages

## Notes

- The leaked password protection warning in Supabase is informational - it suggests enabling additional password security checks
- All test accounts should use strong passwords in production
- Remember to set guides as `is_approved = true` in the database for them to appear on the Find Guides page
