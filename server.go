package main

import (
	"bytes"
	"compress/zlib"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/kr/s3"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func handleError(err error, w http.ResponseWriter) bool {
	if err != nil {
		log.Println(err)
		fmt.Fprintf(w, `{"success":false}`)
		return true
	}
	return false
}

func main() {
	http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		reader, err := zlib.NewReader(r.Body)
		if handleError(err, w) {
			return
		}

		defer reader.Close()
		filename := fmt.Sprintf("%v-%v.png", time.Now().Unix(), randSeq(10))

		body := &bytes.Buffer{}
		_, err = io.Copy(body, reader)

		keys := s3.Keys{
			AccessKey: os.Getenv("S3_KEY"),
			SecretKey: os.Getenv("S3_SECRET"),
		}

		finalURL := "http://" + os.Getenv("S3_BUCKET") + ".s3.amazonaws.com/filereader/" + filename
		req, err := http.NewRequest("PUT", finalURL, body)
		req.ContentLength = int64(body.Len())

		req.Header.Set("X-Amz-Acl", "public-read")
		req.Header.Set("Date", time.Now().UTC().Format(http.TimeFormat))
		req.Header.Set("Content-Type", "image/png")

		s3.Sign(req, keys)

		_, err = http.DefaultClient.Do(req)
		if handleError(err, w) {
			return
		}

		fmt.Fprintf(w, "{\"success\":true,\"url\":\"%v\"}", finalURL)
	})
	http.Handle("/", http.FileServer(http.Dir(".")))

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3000"
	}
	log.Println("Listen on " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}

}
