package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetQuestions(c *gin.Context) {
	rows, err := database.DB.Query("SELECT ID, Text, Option1, Option2, Option3, Option4, SequenceNumber FROM Questions ORDER BY SequenceNumber")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var questions []models.Question
	for rows.Next() {
		var q models.Question
		if err := rows.Scan(&q.ID, &q.Text, &q.Option1, &q.Option2, &q.Option3, &q.Option4, &q.SequenceNumber); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		questions = append(questions, q)
	}
	c.JSON(http.StatusOK, questions)
}

func CreateQuestion(c *gin.Context) {
	var q models.Question
	if err := c.ShouldBindJSON(&q); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var count int
	err := database.DB.QueryRow("SELECT COUNT(*) FROM Questions").Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	q.SequenceNumber = count + 1

	// SQL Server uses @p1, @p2, etc. as placeholders
	_, err = database.DB.Exec("INSERT INTO Questions (Text, Option1, Option2, Option3, Option4, SequenceNumber) VALUES (@p1, @p2, @p3, @p4, @p5, @p6)",
		q.Text, q.Option1, q.Option2, q.Option3, q.Option4, q.SequenceNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, q)
}

func DeleteQuestion(c *gin.Context) {
	id := c.Param("id")

	var seq int
	// SQL Server uses @p1 as placeholder
	err := database.DB.QueryRow("SELECT SequenceNumber FROM Questions WHERE ID = @p1", id).Scan(&seq)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Question not found"})
		return
	}

	_, err = database.DB.Exec("DELETE FROM Questions WHERE ID = @p1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = database.DB.Exec("UPDATE Questions SET SequenceNumber = SequenceNumber - 1 WHERE SequenceNumber > @p1", seq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Question deleted and sequence updated"})
}
