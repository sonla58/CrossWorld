//
//  LoginViewModel.swift
//  CrossWorld
//
//  Created by My Macbook Pro on 3/10/17.
//  Copyright © 2017 Anh Son Le. All rights reserved.
//

import Foundation

class LoginViewModel{
    
    func loginReques(tokenFB: String?, phone: String?, pass: String?, complite: @escaping (_ isComplite: Bool)->()){
       
        APIRequest().loginFacebook(facebook_token: tokenFB, phone_number: phone, password: pass, handle: { (isSuccees, user) in
            if isSuccees{
                complite(true)
            }else{
                complite(false)
            }
        }) { 
            
        }
    }
}
