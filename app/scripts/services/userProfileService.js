(function(){
    angular.module('vorboteApp').service("userProfileService", function(){
        
        var config = {
            authority: "https://alphio-dev1-identity-server.azurewebsites.net/",
            client_id: "moqmail",
            redirect_uri: window.location.protocol + "//" + window.location.host + "/callback.html",
            post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",
            response_type: "id_token token",
            scope: "openid profile email",

            // silent renew will get a new access_token via an iframe 
            // just prior to the old access_token expiring (60 seconds prior)
            silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/silent_renew.html",
            silent_renew: true,

            // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app 
            // wouldn't care about them or want them taking up space
            filter_protocol_claims: false,

            // use session storage
            store: window.localStorage
        };
            
            var mgr = new OidcTokenManager(config);
            
            window.mgr = mgr;
            
            if (!mgr.expired) {
                console.log("Token loaded, expires in: ", mgr.expires_in);
                console.log("profile", mgr.profile);
                console.log("access_token", !!mgr.access_token);
            }
            else {
                console.log("No token loaded");
            }
            
            mgr.addOnTokenObtained(function () {
                console.log("token obtained, scopes: ", mgr.scopes);
            });
            
            mgr.addOnTokenRemoved(function () {
                console.log("token removed");
            });
            
            mgr.addOnTokenExpiring(function () {
                console.log("token is about to expire");
                mgr.renewTokenSilent();
            });
            
            mgr.addOnTokenExpired(function () {
                console.log("token expired");
            });
            
            function redirectForToken () {
                mgr.redirectForToken();
            }
            
            function popupLogin() {
                mgr.openPopupForTokenAsync().then(function () {
                    console.log('popup success');
                }, function (err) {
                    console.log('popup error: ', err);
                });
            }
            
            function removeToken () {
                mgr.removeToken();
            }
            
            function signOut () {
                mgr.redirectForLogout();
            }
            
            function toggleForget() {
                
            }
            
            function getProfile(){
                if(mgr.profile != null){
                    return mgr.profile;
                }
            }
            
            function isAuthenticated(){
                if(mgr.profile != null){
                    return true;
                }
                else{
                    return false;
                }
            }
            
            mgr.addOnTokenObtained(toggleForget);
            mgr.addOnTokenRemoved(toggleForget);
            toggleForget();
            
            return {
                "popupLogin" : popupLogin,
                "login" : redirectForToken,
                "getProfile" : getProfile,
                "isAuthenticated" : isAuthenticated,
                "signOut" : signOut
                
            };
        
    });
})();