import React, { useMemo } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
const NicknameEditForm = () => {
  // style 객체가 리렌더링 되는 것 useMemo 함수로 값 캐싱해 방지
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  const style = useMemo(
    () => ({
      marginBottom: "20px",
      border: "1px solid #d9d9d9",
      padding: "20px",
    }),
    []
  );
  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
        addonBefore="닉네임"
        enterButton="수정"
      />
    </Form>
  );
};

export default NicknameEditForm;
