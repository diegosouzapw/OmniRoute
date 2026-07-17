package voyage

import (
	"sync"

	"github.com/valyala/fasthttp"
)

var (
	requestPool = sync.Pool{
		New: func() interface{} {
			return fasthttp.AcquireRequest()
		},
	}
	responsePool = sync.Pool{
		New: func() interface{} {
			return fasthttp.AcquireResponse()
		},
	}
)

func acquireRequest() *fasthttp.Request {
	return requestPool.Get().(*fasthttp.Request)
}

func releaseRequest(req *fasthttp.Request) {
	req.Reset()
	requestPool.Put(req)
}

func acquireResponse() *fasthttp.Response {
	return responsePool.Get().(*fasthttp.Response)
}

func releaseResponse(resp *fasthttp.Response) {
	resp.Reset()
	responsePool.Put(resp)
}

