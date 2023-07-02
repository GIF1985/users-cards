// import React, { useCallback, useEffect, useState } from "react";
// import Button from "../components/Button/Button";
// import { getUsers, updateUser } from "../services/api";
// import Avatar from "../components/Avatar/Avatar";
// import styles from "./Home.module.css";
// const Home = () => {
//   const defaultFollowers = 100500;
//   const [users, setUsers] = useState([]);
//   const [isFollowing, setIsFollowing] = useState({});

//   useEffect(() => {
//     const lsFollowing = JSON.parse(localStorage.getItem("following") ?? "{}");
//     setIsFollowing(lsFollowing);
//     (async () => {
//       try {
//         const data = await getUsers();
//         setUsers(data);
//       } catch (e) {
//         console.log(e?.response?.data);
//       }
//     })();
//   }, []);

//   const handleFollowClick = useCallback(
//     async (user) => {
//       const allUsers = [...users];
//       try {
//         if (isFollowing[user.id]) {
//           --user.followers;
//           isFollowing[user.id] = false;
//         } else {
//           ++user.followers;
//           isFollowing[user.id] = true;
//         }
//         const updatedUser = await updateUser(user.id, { ...user });
//         if (updatedUser?.id) {
//           const index = allUsers.findIndex((u) => u.id === updatedUser.id);
//           if (index !== -1) {
//             allUsers[index] = updatedUser;
//             localStorage.setItem("following", JSON.stringify(isFollowing));
//             setIsFollowing({ ...isFollowing });
//             setUsers([...allUsers]);
//           }
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     [users]
//   );

//   return (
//     <div className={styles.home}>
//       <h1>Users-Cards</h1>
//       <div className={styles.flex}>
//         {users.map((u) => (
//           <div className={styles.userCard} key={u.id}>
//             <div className={styles.logoContainer}>
//               <img
//                 src="https://i.ibb.co/mtm7wnp/Logo.png"
//                 alt="Image"
//                 style={{ width: 76 }}
//               />
//             </div>
//             <div className={styles.imageContainer}>
//               <img
//                 src="https://i.ibb.co/dBdMF2L/picture34.png"
//                 alt="Image"
//                 style={{ width: 308 }}
//               />
//             </div>
//             <Avatar src={u.avatar} alt={u.user} />
//             {/* <p>{u.user}</p> */}
//             <p>Tweets: {u.tweets ?? 0}</p>
//             <p>
//               Followers:{" "}
//               {(defaultFollowers + u.followers).toLocaleString("en-GB")}
//             </p>
//             {/* <p>{isFollowing[u.id] ? "follow" : "not follow"}</p> */}
//             <Button
//               text="Follow"
//               color="primary"
//               onClick={() => handleFollowClick(u)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useCallback, useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { getUsers, updateUser } from "../services/api";
import Avatar from "../components/Avatar/Avatar";
import styles from "./Home.module.css";

const Home = () => {
  const defaultFollowers = 100500;
  const [users, setUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  useEffect(() => {
    const lsFollowing = JSON.parse(localStorage.getItem("following") ?? "{}");
    setIsFollowing(lsFollowing);
    (async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e) {
        console.log(e?.response?.data);
      }
    })();
  }, []);

  const handleFollowClick = useCallback(
    async (user) => {
      const allUsers = [...users];
      try {
        if (isFollowing[user.id]) {
          --user.followers;
          isFollowing[user.id] = false;
        } else {
          ++user.followers;
          isFollowing[user.id] = true;
        }
        const updatedUser = await updateUser(user.id, { ...user });
        if (updatedUser?.id) {
          const index = allUsers.findIndex((u) => u.id === updatedUser.id);
          if (index !== -1) {
            allUsers[index] = updatedUser;
            localStorage.setItem("following", JSON.stringify(isFollowing));
            setIsFollowing({ ...isFollowing });
            setUsers([...allUsers]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [users]
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Get current cards to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = users.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className={styles.home}>
      <h1>Users-Cards</h1>
      <div className={styles.flex}>
        {currentCards.map((u) => (
          <div className={styles.userCard} key={u.id}>
            <div className={styles.logoContainer}>
              <img
                src="https://i.ibb.co/mtm7wnp/Logo.png"
                alt="Image"
                style={{ width: 76 }}
              />
            </div>
            <div className={styles.imageContainer}>
              <img
                src="https://i.ibb.co/dBdMF2L/picture34.png"
                alt="Image"
                style={{ width: 308 }}
              />
            </div>
            <Avatar src={u.avatar} alt={u.user} />
            <p>Tweets: {u.tweets ?? 0}</p>
            <p>
              Followers:{" "}
              {(defaultFollowers + u.followers).toLocaleString("en-GB")}
            </p>
            <Button
              text={isFollowing[u.id] ? "Unfollow" : "Follow"}
              color="primary"
              onClick={() => handleFollowClick(u)}
            />
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <Button
          text="Previous Page"
          color="primary"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        />
        <Button
          text="Next Page"
          color="primary"
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(users.length / cardsPerPage)}
        />
      </div>
    </div>
  );
};

export default Home;
