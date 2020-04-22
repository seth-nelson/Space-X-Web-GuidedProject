import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { fetchMissions as mockFetchMissions } from '../api/fetchMissions';

import App from '../App';


jest.mock('../api/fetchMissions');
console.log(mockFetchMissions);

test('App fetches missions data and render data', async () => {
    //mockFetchMissions
    //data often called fixtures
    const mockData = { data: [{ mission_id: 'id1', mission_name: 'mission one' }]}
    //mock fetch
    mockFetchMissions.mockResolvedValueOnce(mockData);

    const {getByText} = render(<App />);
    const button = getByText(/get data/i);
    fireEvent.click(button);

    getByText(/we are fetching data/i);
    await waitFor(() => expect(queryAllByText(/mission one/i)).toHaveLength(1));
})