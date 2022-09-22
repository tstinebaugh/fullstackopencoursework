
Map
Anti-pattern: Array Indexes as Keys
Refactoring Modules
When the Application Breaks
Exercises 2.1.-2.5.
b Forms
c Getting data from server
d Altering data in server
e Adding styles to React app
a

Rendering a collection, modules
Before starting a new part, let's recap some of the topics that proved difficult last year.

console.log
What's the difference between an experienced JavaScript programmer and a rookie? The experienced one uses console.log 10-100 times more.

Paradoxically, this seems to be true even though a rookie programmer would need console.log (or any debugging method) more than an experienced one.

When something does not work, don't just guess what's wrong. Instead, log or use some other way of debugging.

NB As explained in part 1, when you use the command console.log for debugging, don't concatenate things 'the Java way' with a plus. Instead of writing:

console.log('props value is ' + props)
separate the things to be printed with a comma:

console.log('props value is', props)
If you concatenate an object with a string and log it to the console (like in our first example), the result will be pretty useless:

props value is [Object object]
On the contrary, when you pass objects as distinct arguments separated by commas to console.log, like in our second example above, the content of the object is printed to the developer console as strings that are insightful. If necessary, read more about debugging React-applications.

Protip: Visual Studio Code snippets
With Visual Studio Code it's easy to create 'snippets', i.e., shortcuts for quickly generating commonly re-used portions of code, much like how 'sout' works in Netbeans.

Instructions for creating snippets can be found here.

Useful, ready-made snippets can also be found as VS Code plugins, in the marketplace.

The most important snippet is the one for the console.log() command, for example, clog. This can be created like so:

{
  "console.log": {
    "prefix": "clog",
    "body": [
      "console.log('$1')",
    ],
    "description": "Log output to console"
  }
}
Debugging your code using console.log() is so common that Visual Studio Code has that snippet built in. To use it, type log and hit tab to autocomplete. More fully featured console.log() snippet extensions can be found in the marketplace.

JavaScript Arrays
From here on out, we will be using the functional programming methods of the JavaScript array, such as find, filter, and map - all of the time. They operate on the same general principles as streams do in Java 8, which have been used during the last few years in both the 'Ohjelmoinnin perusteet' and 'Ohjelmoinnin jatkokurssi' courses at the university's department of Computer Science, and also in the programming MOOC.

If functional programming with arrays feels foreign to you, it is worth watching at least the first three parts of the YouTube video series Functional Programming in JavaScript:

Higher-order functions
Map
Reduce basics
Event Handlers Revisited
Based on last year's course, event handling has proved to be difficult.

It's worth reading the revision chapter at the end of the previous part event handlers revisited, if it feels like your own knowledge on the topic needs some brushing up.

Passing event handlers to the child components of the App component has raised some questions. A small revision on the topic can be found here.

Rendering Collections
We will now do the 'frontend', or the browser-side application logic, in React for an application that's similar to the example application from part 0

Let's start with the following (the file App.js):

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  )
}

export default App