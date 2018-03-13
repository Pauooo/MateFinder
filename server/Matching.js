

exports.SendNotificationToRoomUsers = (userModel, roomId, Infos, ioConnection) => {
  userModel.find()
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
};

exports.SendNotificationToUser = (userModel, userSocket, Infos, ioConnection) => {
  userModel.find()
    .where('userSocketId', userSocket)
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
};

exports.AddUserRoom = (userModel, roomModel, userSocket, roomId, usersInRoom) => {
  // on update room_id de l'user dans la Bdd
  const userConditions = { userSocketId: userSocket };
  const userUpdate = { room_id: roomId };
  const userOptions = { multi: true };
  const userCallBack = (err) => {
    if (err) {
      throw err;
    }
  };
  userModel.update(userConditions, userUpdate, userOptions, userCallBack);

  // on update le nombre d'user dans la room
  const roomConditions = { _id: roomId };
  const roomUpdate = { current_users: usersInRoom + 1 };
  const roomOptions = { multi: true };
  const roomCallBack = (err) => {
    if (err) {
      throw err;
    }
    else {
      roomModel.find()
        .where('_id', roomId)
        .exec((err2, datas) => {
          if (err2) {
            throw err2;
          }
          else {
            datas.forEach((data) => {
              if (data.current_users === data.max_users) {
                const callBackUpdate = (err3) => {
                  if (err3) throw err3;
                };
                roomModel.update({ _id: roomId }, { open: false }, roomOptions, callBackUpdate);
                this.SendNotificationToRoomUsers(roomId, 'RoomFound');
              }
            });
          }
        });
    }
  };
  roomModel.update(roomConditions, roomUpdate, roomOptions, roomCallBack);
};

exports.resetUserRoomId = (userModel, userSocket) => {
  const conditions = { userSocketId: userSocket };
  const update = { room_id: '-1' };
  const options = { multi: true };
  const callback = (err) => {
    if (err) {
      throw err;
    }
  };
  userModel.update(conditions, update, options, callback);
};

exports.RemoveUserRoom = (userModel, roomModel, userSocket) => {
  // On récupère l'user
  userModel.find()
    .where('userSocketId', userSocket)
    .exec((err, users) => {
      if (err) throw err;
      if (users.length === 0) return;
      // on défini une var globale qui contiendra l'id de la room
      let roomId;
      users.forEach((user) => {
        roomId = user.room_id;
      });

      // On recupère la room avec l'id récupéré
      roomModel.find()
        .where('_id', roomId)
        .exec((err2, rooms) => {
          if (err) throw err;
          rooms.forEach((room) => {
            if (room.current_users - 1 === 0) {
              roomModel.update({ _id: roomId }, { open: false }, { multi: true }, (err3) => {
                if (err3) throw err3;
                this.resetUserRoomId(userSocket);
              });
            }
            else {
              roomModel.update(
                { _id: roomId },
                { current_users: room.current_users - 1 },
                { multi: true },
                (err3) => {
                  if (err3) throw err3;
                  this.resetUserRoomId(userSocket);
                  if (room.open === false) {
                    userModel.find()
                      .where('room_id', room.id)
                      .exec((err4, users2) => {
                        users2.forEach((user) => {
                          if (user.userSocketId !== userSocket) {
                            this.SendNotificationToUser(user.userSocketId, 'UserRoomNotAccepted');
                            roomModel.update(
                              { _id: roomId },
                              { open: true },
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
        });
    });
};

exports.CreateNewRoom = (userModel, RoomModel, data, userSocket) => {
  // On crée une instance du Model Room
  const room = new RoomModel();
  // On défini ces propriétés
  room.max_users = data.format;
  if (data.team) room.current_users = data.teamCount;
  room.game = data.game;
  room.lang = data.lang;

  // On le sauvegarde dans MongoDB !
  room.save((err, roomData) => {
    if (err) {
      throw err;
    }
    this.AddUserRoom(userModel, RoomModel, userSocket, roomData.id, roomData.current_users);
  });
};
