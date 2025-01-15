<template>
    <div>
      <h1>API Documentation</h1>
      <div id="swagger-ui"></div>
    </div>
  </template>
  
  <script>
  import SwaggerUI from "swagger-ui-dist/swagger-ui-bundle.js";
  import "swagger-ui-dist/swagger-ui.css";
  
  export default {
    name: "SwaggerUIPage",
    mounted() {
      SwaggerUI({
        url: "/swagger.yaml", 
        dom_id: "#swagger-ui",
      });
    },
  };
  </script>
  
  <style>
  </style>
  