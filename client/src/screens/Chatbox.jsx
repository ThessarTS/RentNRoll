const TalkjsRn = require("@talkjs/expo");
import { useFocusEffect } from "@react-navigation/core";
import { useCallback } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions";
import CustomHeader from "../components/CustomHeader";
//felix
export const Chatbox = (props) => {
  const { profile } = useSelector((state) => state.userReducer);
  const { fullName, id, profilePicture, email } = props.route.params;

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, [])
  );
  const other = {
    id: id,
    name: fullName,
    email: email,
    photoUrl: profilePicture,
    welcomeMessage: "Hey there! How can i help?",
  };

  const me = {
    id: profile.id,
    name: profile.fullName,
    email: profile.email,
    photoUrl: profile.UserProfile.profilePicture,
  };
  const conversation = props.conversationBuilder || props.route.params.conversationBuilder;
  const conversationId = conversation?.id || TalkjsRn.oneOnOneId(me.id, other.id);
  const conversationBuilder = TalkjsRn.getConversationBuilder(conversationId);
  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);
  return (
    <View style={{ flex: 1 }}>
      <TalkjsRn.Session appId="tDSnHzrH" me={me}>
        <TalkjsRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkjsRn.Session>
    </View>
  );
};
