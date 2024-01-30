// utils/extractUserIDs.js
function extractUserIDs(messages) {
    const uniqueUserIDs = Array.from(new Set(messages.map((message) => message.UserID)));
    return uniqueUserIDs;
  }
  
  module.exports = extractUserIDs;
  