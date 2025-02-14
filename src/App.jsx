import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const API_URL = "";

    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/todos`);
            setTodos(response.data);
            setShowErrorMessage(false);
            setError(null);
        } catch (error) {
            setError(error.message);
            setShowErrorMessage(true);
            console.error('Failed to fetch todos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addTodo = async () => {
        setIsLoading(true);
        try {
            const newTodo = {
                Id: todos.length + 1,
                Title: newTodoTitle,
                IsCompleted: false,
            };
            
            await axios.post(`${API_URL}/todos`, newTodo);
            fetchTodos();
            setNewTodoTitle('');
        } catch (error) {
            console.error('Failed to add todo:', error);
            setError(error.message);
            setShowErrorMessage(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>Lista de To-Dos</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {todos.map((todo, index) => (
    <li key={todo.id || index}>{todo.title}</li>
  ))}
                </ul>
            )}
            {showErrorMessage && <div style={{ color: 'red' }}>Erro: {error}</div>}
            <div>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Digite um novo To-Do"
                />
                <button onClick={addTodo}>Adicionar To-Do</button>
            </div>
        </div>
    );
}

export default App;
