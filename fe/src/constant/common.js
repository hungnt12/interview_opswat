export const TABLE_MAPPING = {
    USERS: {
        name: "Name",
        code: "ISO\u00a0Code",
        size: "Population",
        density: "Size\u00a0(km\u00b2)",
        population: "Population",

        email: "Email",
        username: "Username",
        fullname: "Fullname",
        action: "Action"
    },
    ARTICLES: {
        title: "Title",
        body: "Body",
        favourite_count: "Favourite Count",
        created_at: "Create Date",
        updated_at: "Update Date",
        id: "Order",
        action: "Action"
    },
}

export const URL_API = {
    LOGIN: "http://localhost:3111/api/login",
    USERS_LIST: "http://localhost:3111/api/users",
    ARTICLES_LIST: "http://localhost:3111/api/articles",
    ARTICLES_CREATE: "http://localhost:3111/api/articles",
    ARTICLES_ITEM: "http://localhost:3111/api/articles",
    ARTICLES_UPDATE: "http://localhost:3111/api/articles",
    ARTICLES_DELETE: "http://localhost:3111/api/articles",
}
