// pages/index.js
import { useEffect, useState } from 'react';
import { readCSV } from '../utils/csvReader';

const CSV_FILE_PATH = '/messages.csv'; // Adjust the path accordingly

export default function Home() {
  const [csvData, setCsvData] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

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
      return groups;
    }, {});

    // Convert the grouped object into an array
    const userGroupsArray = Object.entries(groupedUsers).map(([userID, messages]) => ({
      userID,
      messages,
    }));

    setUserGroups(userGroupsArray);
  }, [csvData]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <h1>Grouped Users</h1>
        <ul>
          {userGroups.map((group) => (
            <li key={group.userID}>
              <strong>{group.userID}</strong>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '2' }}>
        <h1>Messages</h1>
        <ul>
          {csvData.map((row, index) => (
            <li key={index}>
              UserID: {row.UserID}, Timestamp: {row.Timestamp}, Messages: {row.Messages}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

