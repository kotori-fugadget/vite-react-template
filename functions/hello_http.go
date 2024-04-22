// Package helloworld provides a set of Cloud Functions samples.
package helloworld

import (
	"context"
	"encoding/json"
	"fmt"
	"html"
	"net/http"

	firebase "firebase.google.com/go"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"google.golang.org/api/option"
)

func init() {
	functions.HTTP("HelloHTTP", HelloHTTP)
	// functions.HTTP("CloudFunctionsTest", CloudFunctionsTest)
}

// HelloHTTP is an HTTP Cloud Function with a request parameter.
func HelloHTTP(w http.ResponseWriter, r *http.Request) {
	var d struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&d); err != nil {
		fmt.Fprint(w, "Hello, World!")
		return
	}
	if d.Name == "" {
		fmt.Fprint(w, "Hello, World!")
		return
	}
	fmt.Fprintf(w, "Hello, %s!", html.EscapeString(d.Name))
}

type FirestoreData struct {
	Field1 string `json:"field1"`
	Field2 int    `json:"field2"`
}

func CloudFunctionsTest(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Firebase SDKの初期化
	opt := option.WithCredentialsFile("path/to/serviceAccountKey.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error initializing app: %v", err), http.StatusInternalServerError)
		return
	}

	// Firestoreクライアントの作成
	client, err := app.Firestore(ctx)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error creating Firestore client: %v", err), http.StatusInternalServerError)
		return
	}
	defer client.Close()

	// Firestoreにデータを書き込む例
	data := map[string]interface{}{
		"field1": "example",
		"field2": 42,
	}

	_, _, err = client.Collection("test").Add(ctx, data)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error adding document: %v", err), http.StatusInternalServerError)
		return
	}

	// 成功時のHTTPレスポンス
	response := map[string]string{"message": "Document added to Firestore successfully"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
