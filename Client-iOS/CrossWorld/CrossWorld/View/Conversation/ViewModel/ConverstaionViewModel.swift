//
//  ConverstaionViewModel.swift
//  CrossWorld
//
//  Created by My Macbook Pro on 3/11/17.
//  Copyright © 2017 Anh Son Le. All rights reserved.
//

import Foundation

class ConverstaionViewModel{
    var room: Room? {
        didSet{
            if let room = room{
                room.friend_room = [RoomDetail]()
                
                if let homtows = room.native_room{
                    room.friend_room = homtows
                }
                
                if let other = room.foreign_room{
                    for item in other{
                        room.friend_room?.insert(item, at: Int(arc4random_uniform(UInt32(room.friend_room!.count))))
                    }
                }
            }
        }
    }
    
    func reloadData(){
        SocketRequest.share.sendGetAllRoom {
            
        }
    }
    
    func getData(complite: @escaping (_ isComplite: Bool)->Void){
        
        SocketRequest.share.onGetAllRoom { (isSuccess, data) in
            if isSuccess{
                let res = ResObject(dictionary: data)
                if let data = res.data{
                    let room = Room(dictionary: data)
                    self.room = room
                    complite(true)
                }
            }else{
                complite(false)
            }
        }
    }
}
