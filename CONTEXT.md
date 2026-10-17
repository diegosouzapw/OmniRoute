# Domain Glossary

- **Orchestration model**: A model that chooses and calls an image-generation tool; not necessarily the engine that creates the image.
- **Image engine**: The model responsible for generating the output pixels. A configured name does not prove which engine served a request.
- **Reference image**: Original user-approved image bytes used to guide generation or editing.
- **Native output**: The image returned by the provider, without client-side resizing.
- **Requested resolution**: The pixel dimensions or resolution tier requested by the operator.
- **Actual resolution**: Pixel dimensions verified by decoding the saved native output.
- **Account availability**: Whether the selected account can use a model and operation at the time checked.
- **Model alias**: An alternate label for the same canonical model, not permission to substitute another model family.
- **Custom model entry**: A configured routing name; adding it does not create a provider model or grant a capability.
- **Receipt artifact**: A saved copy of an operation result, distinct from the durable request record that prevents repeated paid submission.
- **Isolated gateway**: A separate runtime with its own writable artifacts, listener and state, independent of the active gateway.
