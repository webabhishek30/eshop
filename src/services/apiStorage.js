const EshopApi = {
    // SignUp API
    signUpApi : async () => {
        const res = await fetch('http://localhost:8080/api/auth/signup');
        const result = res.json();
        return result;
    },

    // Login API
    loginApi : async () => {
        const res = await fetch('http://localhost:8080/api/auth/signin');
        const result = res.json();
        return result;
    },

    // All Product API
    allProductsApi : async () => {
        const res = await fetch('http://localhost:8080/api/products');
        const result = res.json();
        return result;
    },

    // All Product API
    singleProductsApi : async (id) => {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const result = await res.json();
        return result;
    },

    // Search Product API
    searchProductsApi : async (param) => {
        const res = await fetch('http://localhost:8080/api/products');
        const result = await res.json();
        return result.filter((product) => product.name?.toLowerCase().includes(param));
    },

    // Product Categories API
    allProductsCategoriesApi : async () => {
        const res = await fetch('http://localhost:8080/api/products/categories');
        const result = res.json();
        return result;
    },

    // User API
    fetchUser : async (id) => {
        const res = await fetch(`http://localhost:8080/api/users/${id}`);
        const result = res.json();
        return result;
    }
}

export {EshopApi};