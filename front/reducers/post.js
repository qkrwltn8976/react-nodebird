const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "지구박",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://cdn.eyesmag.com/content/uploads/posts/2022/08/08/main-ad65ae47-5a50-456d-a41f-528b63071b7b.jpg",
        },
        {
          src: "https://interbalance.org/wp-content/uploads/2021/08/ray-zhuang-Px2Y-sio6-c-unsplash-scaled.jpg",
        },
        {
          src: "https://img.catpre.com/web/catpre/event/popular_keyword_theme/22_pc_main_page_banner_0734.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고 싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = () => {
  return {
    type: ADD_POST,
  };
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "지구박",
  },
  content: "더미데이터입니다",
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
