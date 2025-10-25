package main
import (
  "github.com/gin-gonic/gin"
  "net/http"
)
func main() {
  r := gin.Default()
  r.GET("/health", func(c *gin.Context){ c.JSON(http.StatusOK, gin.H{"status":"analytics ok"}) })
  r.POST("/track", func(c *gin.Context){
    var payload map[string]interface{}
    if err := c.BindJSON(&payload); err != nil { c.JSON(400, gin.H{"error":"invalid"}); return }
    c.JSON(200, gin.H{"received": payload})
  })
  r.Run(":6001")
}
