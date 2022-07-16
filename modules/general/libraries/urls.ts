const URLs = Object.freeze({
  home: "/",
  collections: "/collections",
  collection(id: string) {
    return "/collections/" + id;
  },
  user(username: string) {
    return Object.freeze({
      main: `/user/${username}`,
      liked: `/user/${username}/liked`,
      collections: `/user/${username}/collections`,
    });
  },
  search: Object.freeze({
    main: "/search",
    users: "/search/users",
    collections: "/search/collections",
  }),
  member: Object.freeze({
    main: "/member",
    liked: "/member/liked",
    collections: "/member/collections",
  }),
});

export default URLs;
