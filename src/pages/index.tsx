// pages/index.tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { fetchPosts } from '../api';

// import styles from './HomePage.module.scss';
import {PostData} from '~/types/post';

interface HomePageProps {
  posts: PostData[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => (
  <div className=''>
    <h1>Блог</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.id} className=''>
          <Link href={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
};

export default HomePage;
