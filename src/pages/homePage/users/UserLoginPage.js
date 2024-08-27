import React from 'react';

function UserLoginPage(props) {
    return (
        <div class="container">

        <div class="row justify-content-center">
  
            <div class="col-xl-10 col-lg-12 col-md-9">
  
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block"><img src="" alt="img"/></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="mb-4">SIGN IN</h1>
                                    </div>
  
                                    <form class="user" action="" method="post">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" name="email"
                                                placeholder="Email"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" name="password"/>
                                        </div>
                                      
                                        <input type="submit" value="Sign in" class="btn btn-primary btn-user btn-block"/>
                                    </form>
                                    <hr/>
                                    <div class="text-center">
                                        <a class="small" href="">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  
            </div>
  
        </div>
  
    </div>
    );
}

export default UserLoginPage;