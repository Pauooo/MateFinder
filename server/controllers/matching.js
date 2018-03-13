const RoomModel = require('../models/Rooms');
const UserModel = require('../models/Users');

const Matching = {
  SendNotificationToRoomUsers: (roomId, Infos, ioConnection) => {
    UserModel.find()
      .where('room_id', roomId)
      .exec((err, users) => {
        if (err) {
          throw err;
        }
        else {
          users.forEach((user) => {
            ioConnection.sockets.connected[user.userSocketId].emit(Infos);
          });
        }
      });
  },

  SendNotificationToUser: (userSocket, Infos, ioConnection) => {
    UserModel.findOne({ userSocketId: userSocket })
      .exec((err, user) => {
        if (err) {
          throw err;
        }
        ioConnection.sockets.connected[user.userSocketId].emit(Infos);
      });
  },

  AddUserRoom: (userSocket, roomId, usersInRoom, number, ioConnection) => {
    // on update room_id de l'user dans la Bdd
    const userConditions = { userSocketId: userSocket };
    const userUpdate = {
      room_id: roomId,
      inTeam: (number !== 1),
      TeamCount: number,
    };
    const userOptions = { multi: true };
    UserModel.update(userConditions, userUpdate, userOptions, (er) => {
      if (er) throw er;
      else {
        // on update le nombre d'user dans la room
        const roomConditions = { _id: roomId };
        const roomUpdate = { current_users: usersInRoom + number };
        const roomOptions = { multi: true };
        const roomCallBack = (err) => {
          if (err) {
            throw err;
          }
          else {
            RoomModel.findOne({ _id: roomId })
              .exec((err2, room) => {
                if (err2) {
                  throw err2;
                }
                else if (room.current_users === room.max_users) {
                  const callBackUpdate = (err3) => {
                    if (err3) throw err;
                  };
                  RoomModel.update({ _id: roomId }, { open: false }, roomOptions, callBackUpdate);
                  Matching.SendNotificationToRoomUsers(roomId, 'RoomFound', ioConnection);
                }
              });
          }
        };
        RoomModel.update(roomConditions, roomUpdate, roomOptions, roomCallBack);
      }
    });
  },

  resetUserRoomId: (userSocket) => {
    const conditions = { userSocketId: userSocket };
    const update = { room_id: '-1' };
    const options = { multi: true };
    const callback = (err) => {
      if (err) {
        throw err;
      }
    };
    UserModel.update(conditions, update, options, callback);
  },

  RemoveUserRoom: (userSocket, team, teamCount, ioConnection) => {
    // On récupère l'user
    UserModel.findOne({ userSocketId: userSocket })
      .exec((err, user) => {
        if (err) throw err;
        if (user && user.room_id !== '-1') {
          // on défini une var globale qui contiendra l'id de la room
          const roomId = user.room_id;
          // On recupère la room avec l'id récupéré
          RoomModel.findOne({ _id: roomId })
            .exec((err2, room) => {
              if (err2) throw err2;
              if (room.current_users - (team) ? teamCount : 1 === 0) {
                RoomModel.update({ _id: roomId }, { open: false }, { multi: true }, (err3) => {
                  if (err3) throw err3;
                  Matching.resetUserRoomId(userSocket);
                });
              }
              else {
                RoomModel.update(
                  { _id: roomId },
                  { current_users: room.current_users - (team) ? teamCount : 1 },
                  { multi: true },
                  (err3) => {
                    if (err3) throw err3;
                    Matching.resetUserRoomId(userSocket);
                    if (!room.open && !room.inRoom) {
                      UserModel.find()
                        .where('room_id', room.id)
                        .exec((err4, users) => {
                          users.forEach((usr) => {
                            if (usr.userSocketId !== userSocket) {
                              Matching.SendNotificationToUser(usr.userSocketId, 'UserRoomNotAccepted', ioConnection);
                              RoomModel.update(
                                { _id: roomId },
                                { open: true, accepted_users: 0 },
                                { multi: true },
                                (err5) => {
                                  if (err5) throw err5;
                                },
                              );
                            }
                          });
                        });
                    }
                  },
                );
              }
            });
        }
      });
  },

  CreateNewRoom: (data, userSocket, ioConnection) => {
    // On crée une instance du Model Room
    const room = new RoomModel();
    // On défini ces propriétés
    room.max_users = data.format;
    room.game = data.game;
    room.lang = data.lang;

    // On le sauvegarde dans MongoDB !
    room.save((err, roomData) => {
      if (err) {
        throw err;
      }
      Matching.AddUserRoom(userSocket, roomData.id, roomData.current_users, (data.team) ? data.teamCount : 1, ioConnection);
    });
  },
};

module.exports = Matching;
