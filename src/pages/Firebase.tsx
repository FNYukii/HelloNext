import { TweetService } from '@/utilities/TweetService';
import { db } from '../utilities/admin';
import Link from 'next/link';

export async function getStaticProps() {

  const tasks:any = [];
  const ref = await db.collection('tasks').get();

  ref.docs.map((doc) => {
    const data = { id: doc.id, title: doc.data().title };
    tasks.push(data);
  });



	const tweets = await TweetService.readTweets()


  return {
    props: {
      tasks,
    },
  };
}

export default function Firebase({ tasks } : any) {
  return (
    <>
      <h1>Firebaseのページ</h1>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <Link href={`/`}>
        <a>戻る</a>
      </Link>
    </>
  );
}

