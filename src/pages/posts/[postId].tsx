
import { GetServerSideProps } from 'next';

import Comments from '../components/Comments';
import Post from '../components/Post';

import {fetchComments, fetchPost} from '~/api';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/named
import {CommentData} from '~/types/comments';
import {PostData} from '~/types/post';

interface PostPageProps {
    comments: CommentData[];
    post: PostData;
}

const PostPage: React.FC<PostPageProps> = ({ post, comments }) => {
  return (
    <div className=''>
      <Post post={post} />
      <Comments comments={comments} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ params, query }) => {
  const postId = params?.postId as string;
  const page = query.page || 1;
  const post = await fetchPost(postId);
  const comments = await fetchComments(postId, page);

  return {
    props: {
      comments,
      post,
    },
  };
};

export default PostPage;
