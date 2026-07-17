package testutil

import (
	"bytes"
	"io"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

// CaptureOutput captures stdout/stderr during command execution
func CaptureOutput(fn func()) (stdout, stderr string) {
	oldStdout := os.Stdout
	oldStderr := os.Stderr

	rOut, wOut, _ := os.Pipe()
	rErr, wErr, _ := os.Pipe()

	os.Stdout = wOut
	os.Stderr = wErr

	done := make(chan bool)
	var outBuf, errBuf bytes.Buffer

	go func() {
		io.Copy(&outBuf, rOut)
		done <- true
	}()

	go func() {
		io.Copy(&errBuf, rErr)
		done <- true
	}()

	fn()

	wOut.Close()
	wErr.Close()
	<-done
	<-done

	os.Stdout = oldStdout
	os.Stderr = oldStderr

	return outBuf.String(), errBuf.String()
}

// ExecuteCommand executes a cobra command and captures output
func ExecuteCommand(cmd *cobra.Command, args ...string) (stdout, stderr string, err error) {
	// Capture stdout/stderr at OS level to catch fmt.Println
	oldStdout := os.Stdout
	oldStderr := os.Stderr
	
	rOut, wOut, _ := os.Pipe()
	rErr, wErr, _ := os.Pipe()
	
	os.Stdout = wOut
	os.Stderr = wErr
	
	var outBuf, errBuf bytes.Buffer
	done := make(chan bool, 2)
	
	// Capture stdout
	go func() {
		io.Copy(&outBuf, rOut)
		done <- true
	}()
	
	// Capture stderr
	go func() {
		io.Copy(&errBuf, rErr)
		done <- true
	}()
	
	// Set args and execute
	cmd.SetArgs(args)
	err = cmd.Execute()
	
	// Close writers to signal EOF
	wOut.Close()
	wErr.Close()
	
	// Wait for goroutines to finish
	<-done
	<-done
	
	// Restore original stdout/stderr
	os.Stdout = oldStdout
	os.Stderr = oldStderr
	
	return outBuf.String(), errBuf.String(), err
}

// SetEnv sets environment variables for testing
func SetEnv(key, value string) func() {
	oldValue := os.Getenv(key)
	os.Setenv(key, value)
	return func() {
		if oldValue == "" {
			os.Unsetenv(key)
		} else {
			os.Setenv(key, oldValue)
		}
	}
}

// UnsetEnv removes an environment variable for testing
func UnsetEnv(key string) func() {
	oldValue := os.Getenv(key)
	os.Unsetenv(key)
	return func() {
		if oldValue != "" {
			os.Setenv(key, oldValue)
		}
	}
}

// Contains checks if a string contains a substring
func Contains(s, substr string) bool {
	return strings.Contains(s, substr)
}

// HasPrefix checks if a string has a prefix
func HasPrefix(s, prefix string) bool {
	return strings.HasPrefix(s, prefix)
}

// HasSuffix checks if a string has a suffix
func HasSuffix(s, suffix string) bool {
	return strings.HasSuffix(s, suffix)
}
