import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/app/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {username}!</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
