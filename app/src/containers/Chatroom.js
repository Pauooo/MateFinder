/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Chatroom from 'src/components/Chatroom';

// Action creators
import { sendMessage, exitChatRoom } from 'src/store/middlewares/socket';
import { addEmoji } from 'src/store/reducers/auth';

/**
 * Code
 */
// State
const mapStateToProps = state => ({
  messages: state.auth.chatroom.Messages,
  users: state.auth.chatroom.users,
  username: state.auth.login.username,
  inputMessage: state.auth.chatroom.inputMessage,
  inRoom: state.matching.inRoom,
});

// Actions
// 2 paramètres (dispatch, ownProps) sont dispo
// Si je ne veux pas renvoyer de props
// const mapDispatchToProps = {};
const mapDispatchToProps = dispatch => ({
  sendMessage: () => {
    dispatch(sendMessage());
  },
  addEmoji: (emoji) => {
    dispatch(addEmoji(emoji));
  },
  exitChatRoom: () => {
    dispatch(exitChatRoom());
  },
});

/*
 * Container
 */
const ChatroomContainer = connect(mapStateToProps, mapDispatchToProps)(Chatroom);


/**
 * Export
 */
export default ChatroomContainer;
