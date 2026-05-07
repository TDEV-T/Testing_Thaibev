package models

type Question struct {
	ID             int    `json:"id"`
	Text           string `json:"text"`
	Option1        string `json:"option1"`
	Option2        string `json:"option2"`
	Option3        string `json:"option3"`
	Option4        string `json:"option4"`
	SequenceNumber int    `json:"sequence_number"`
}
