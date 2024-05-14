## Web app for Interactive Story Generation

The repo currently contains only the frontend react app.

Simple flask-based backend to serve both frontend and generateNextLine from ISG inference at [link](https://colab.research.google.com/drive/1VGTCFM8lKyqXBSKERLP2Wc2EZ-oMb35Q?usp=sharing) should work.

The current frontend assumes a POST end point at `/api/story` with body containing
```
{
    prompt: "new_line_from_user", 
    story: "story_generated_so_far",
    model: "model_name",
}
```

Set the backend to call the `generateNextLine` using the data from request body and send back the generated line as response over this endpoint.
