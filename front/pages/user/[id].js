import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { LOAD_USER_REQUEST } from "../../reducers/user";
import { useRouter } from "next/dist/client/router";
import { Avatar, Card } from "antd";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  // if (router.isFallback) {
  //   return <div>로딩중...</div>;
  // }

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1]?.id,
            data: id,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <>
          {" "}
          <Head>
            <title>{userInfo.nickname}님의 글</title>
            <meta name="description" content={userInfo.nickname} />
            <meta
              property="og:title"
              content={`${userInfo.nickname}님의 게시글`}
            />
            <meta
              property="og:description"
              content={`${userInfo.nickname}님의 게시글`}
            />
            <meta
              property="og:image"
              content={"https://nodebird.com/favicon.ico"}
            />
            <meta
              property="og:url"
              content={`https://nodebird.com/user/${id}`}
            />
          </Head>
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="followings">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="followers">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        </>
      )}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: { id: "1" },
//         params: { id: "2" },
//       },
//     ],
//     fallback: true,
//   };
// }
// getServerSideProps: 접속할 때마다 데이터가 바뀌어야 하는 경우
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      // 프론트 서버에서 쿠키가 공유되는 문제 방지
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default User;
