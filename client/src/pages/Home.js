import { useAuth } from "../util/auth";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      {/* TODO: display logged in user's username */}
      <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
      <hr />
      <h3 style={{ textAlignVertical: "center", textAlign: "center" }}>
        <a href="./restroomsNearYou">Browse restrooms</a> near you and sign up
        to help us add to our database!
      </h3>
      <p style={{ textAlignVertical: "center", textAlign: "center" }}>
        must share location OR change location settings in browser
      </p>
    </div>
  );
}
