// pages/index.js
import { connectToMongo } from '../utils/mongodb';

const Home = ({ mongoData }) => {
  return (
    <div>
      <h1>Data from MongoDB</h1>
      <pre>{JSON.stringify(mongoData, null, 2)}</pre>
    </div>
  );
};

export async function getStaticProps() {
  const { client, db } = await connectToMongo();
  const collection = db.collection('customermessages');
  const mongoData = await collection.find({}).toArray();

  client.close();

  return {
    props: {
      mongoData: JSON.parse(JSON.stringify(mongoData)),
    },
  };
}

export default Home;
