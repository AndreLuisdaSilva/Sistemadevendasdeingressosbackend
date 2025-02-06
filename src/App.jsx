import React, { useState, useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Initialize with true
    const [error, setError] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const API_URL = 'https://3000-idx-netcore-1733403659992.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev';

    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/todos`, { // Using the constant
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const text = await response.text();  // Pega a resposta como texto primeiro
            console.log('Resposta recebida:', text);  // Verifique o que está sendo retornado
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Response JSON:', data); // Log dos dados retornados
            setTodos(data);
            setShowErrorMessage(false)
            setError(null)
        } catch (error) {
            setError(error.message)
            setShowErrorMessage(true)
            console.error('Failed to fetch todos:', error);
        } finally {
            setIsLoading(false); // Set loading to false in any case
        }
    };

    const addTodo = async () => {
        setIsLoading(true);
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Id: todos.length + 1,
                    Title: newTodoTitle,
                    IsCompleted: false
                }),
            };

            const response = await fetch(`${API_URL}/todos`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await response.json(); // Ensure the response is processed
            const data = await response.json();
            console.log('Todo adicionado com sucesso:', data);
            fetchTodos();
            setNewTodoTitle('');
        } catch (error) {
            console.error('Failed to add todo:', error);
            setError(error.message);
            setShowErrorMessage(true)
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
                    {todos.map((todo) => (
                        <li key={todo.Id}>
                            ID: {todo.Id} - {todo.Title} - Completado: {todo.IsCompleted ? 'Sim' : 'Não'}
                        </li>
                    ))}
                </ul>
            )}
                {showErrorMessage && <div style={{color:"red"}}>Erro: {error}</div>}
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
