import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

function NewTodo() {

  const [todoData, setTodoData] = useState({
    todoItem: "",
    priority: "High",
    emoji: "🌄",
  });

  const [emojiPicker, setEmojiPicker] = useState(false);
 const Addtodo = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/todos",
      todoData
    );

    if (response) {
      alert(response.data.message);

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          ✏️ New Todo
        </h1>
        
        {/* Todo Input */}
        <input
          type="text"
          value={todoData.todoItem}
          onChange={(e) =>
            setTodoData({ ...todoData, todoItem: e.target.value })
          }
          placeholder="Enter todo task..."
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Priority Select */}
        <select
          value={todoData.priority}
          onChange={(e) =>
            setTodoData({ ...todoData, priority: e.target.value })
          }
          className="w-full border p-3 rounded-xl"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Emoji Picker Button */}
        <button
          onClick={() => setEmojiPicker(!emojiPicker)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Select Emoji {todoData.emoji}
        </button>

        {/* Emoji Picker */}
        {emojiPicker && (
          <EmojiPicker
            onEmojiClick={(emoji) => {
            setTodoData({ ...todoData, emoji: emoji.emoji });
            setEmojiPicker(false);   // picker close
         }}
         />
        )}

        {/* Save Button (Backend API Ready) */}
        <button className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition" onClick={Addtodo}>
          Save Todo
        </button>

      </div>
    </div>
  );
}

export default NewTodo;