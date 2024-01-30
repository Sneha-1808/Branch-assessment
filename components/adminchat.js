
import { useEffect, useRef, useState } from 'react';
import { readCSV } from '../utils/csvReader';
import io from 'socket.io-client';

const CSV_FILE_PATH = '/messages.csv'; // Adjust the path accordingly

const socket = io('http://localhost:4000'); // Connect to the Socket.IO server

export default function Home() {
  const [csvData, setCsvData] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const replyInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readCSV(CSV_FILE_PATH);
        setCsvData(data);
      } catch (error) {
        console.error('Error reading CSV:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Group users by their IDs
    const groupedUsers = csvData.reduce((groups, user) => {
      const userID = user.UserID;
      if (!groups[userID]) {
        groups[userID] = [];
      }
      groups[userID].push(user);
      groups[userID].sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
      return groups;
    }, {});

    // Convert the grouped object into an array
    const userGroupsArray = Object.entries(groupedUsers)
      .map(([userID, messages]) => ({ userID, messages }))
      .sort((a, b) => {
        const latestMessageTimeA = a.messages[0] ? new Date(a.messages[0].Timestamp) : 0;
        const latestMessageTimeB = b.messages[0] ? new Date(b.messages[0].Timestamp) : 0;
        return latestMessageTimeB - latestMessageTimeA;
      });

    setUserGroups(userGroupsArray);
  }, [csvData]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUserClick = (userID) => {
    setSelectedUser(userID);
    setMessages([]); // Clear existing messages
    // Fetch and display messages for the selected user
    if (userGroups.find((user) => user.userID === userID)) {
      const userMessages = userGroups.find((user) => user.userID === userID).messages;
      const sortedMessages = [...userMessages].sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));
      setMessages(sortedMessages);
    }
    setOpen(true);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
  
    if (selectedUser && replyMessage.trim() !== '') {
      const reply = {
        UserID: 'Agent', // Use a specific ID or label for agent replies
        Timestamp: new Date().toISOString(),
        Messages: replyMessage.trim(),
      };
  
      socket.emit('message', reply);
  
      // Find the index of the user's message in the messages array
      const userMessageIndex = messages.findIndex(
        (message) => message.UserID === selectedUser
      );
  
      // Insert the agent's reply right after the user's message
      const updatedMessages = [...messages];
      updatedMessages.splice(userMessageIndex + 1, 0, reply);
  
      setMessages(updatedMessages);
      setReplyMessage('');
  
      // Clear the input field
      if (replyInputRef.current) {
        replyInputRef.current.value = '';
      }
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUserGroups = userGroups.filter(user => user.userID.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMessages = messages.filter(message => message.Messages.toLowerCase().includes(searchTerm.toLowerCase()));

  const containsKeyword = (message, keyword) => message.Messages.toLowerCase().includes(keyword.toLowerCase());
  const markPriority = (message) => {
    if (containsKeyword(message, 'loan approval') || containsKeyword(message, 'loan disbursed') || containsKeyword(message, 'loan process') || containsKeyword(message, 'approval process')) {
      return 'high'; // High priority (marked with red dot)
    } else if (containsKeyword(message, 'how to update ') || containsKeyword(message, 'update info') || containsKeyword(message, 'Branch account'))  {
      return 'normal'; // Low priority (marked with orange dot)
    } else {
      return 'low'; // No priority marking
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column',  marginTop:'50px',padding: '20px 30px' }}>
    <div>
        <input type="text" placeholder="Search user" onChange={handleSearch} />
      </div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' ,overflowY: 'auto', maxHeight: '100vh', padding: '20px 30px'}}>
        <h1>Grouped Users</h1>
        <ul className='flex flex-col space-y-1 mt-4 -mx-2 h-58 overflow-y-auto cursor-pointer border-b-2'>
        {filteredUserGroups.map((group) => (
              <li className="border-b-2" key={group.userID} onClick={() => handleUserClick(group.userID)}>
                <strong>{group.userID}</strong>
                {(group.priority === 'high' || markPriority(group.messages[0]) === 'high') && <span style={{ color: 'red', marginLeft: '5px' }}>●</span>}
                <span style={{ color: 'red', marginLeft: '5px' }}>●</span>
                
              </li>
            ))}
          
        </ul>
      </div>
      <div style={{ flex: '2' ,padding: '20px' }}>
        <h1>Chat with Users</h1>
        <div>
          
            {/* <p key={index}>
              <strong>{message.Timestamp}:</strong> {message.Messages}
            </p> */}
            {messages.map((message, index) => (
              <>{message.userID!=='Agent' &&
            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      U
                    </div>
                    
                    
                      <div
                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div key={index} >{message.Messages}
                      <div className='text-sm text-gray-500'>{message.Timestamp}</div></div>
                      </div>
                     
                   
                  </div>
              </div>
              } {message.userID==='Agent' && <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div key={index} >{message.Messages}
                      <div>{message.Timestamp}</div>
                      </div>
                    </div>
                  </div>
                </div>}</>
              
             )).reverse()}  
          
        </div>
        
        <form onSubmit={handleReplySubmit}>
        <div class="flex-grow ml-4">
        <div class="relative w-full">
              
         

          <div class="ml-4">
          <input
            type="text"
            placeholder="Type your reply..."
            onChange={(e) => setReplyMessage(e.target.value)}
            ref={replyInputRef}
            className='class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"'
          />
              <button
                class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                type="submit"
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
          </div>

        
        </div>
        </div>
        </form>
      </div>
    </div>
    </div>
  );
}
