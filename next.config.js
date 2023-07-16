/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["photostad-api.istad.co"],
        remotePatterns:[
            {
                hostname:"photostad-api.istad.co",
                protocol:"https"
                
            }
        ]

    }
}

module.exports = nextConfig
