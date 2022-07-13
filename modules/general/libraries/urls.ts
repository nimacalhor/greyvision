const URLs = Object.freeze({
  home: "/",
  collections: "/collections",
  collection(id: string) {
    return "/collections/" + id;
  },
  member(username: string) {
    return {
      main: `/member/${username}`,
      liked: `/member/${username}/liked`,
      collections: `/member/${username}/collections`,
    };
  },
  search: {
    main: "/search",
    users: "/search/users",
    collections: "/search/collections",
  },
  user: {
    main: "/user",
    liked: "/user/liked",
    collections: "/user/collections",
  },
});

export default URLs;
