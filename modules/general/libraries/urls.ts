const URLs = Object.freeze({
  home: "/",
  collections: "/collections",
  collection(id: string) {
    return "/collections/" + id;
  },
  member(username: string) {
    return Object.freeze({
      main: `/member/${username}`,
      liked: `/member/${username}/liked`,
      collections: `/member/${username}/collections`,
    });
  },
  search: Object.freeze({
    main: "/search",
    users: "/search/users",
    collections: "/search/collections",
  }),
  user: Object.freeze({
    main: "/user",
    liked: "/user/liked",
    collections: "/user/collections",
  }),
});

export default URLs;
