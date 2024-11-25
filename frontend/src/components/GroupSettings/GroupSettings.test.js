// GroupSettings.test.js
import React from 'react';
import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GroupSettings from './GroupSettings';

const mock = new MockAdapter(axios);

describe('GroupSettings', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/groups/1']}>
        <GroupSettings />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders group settings after successful fetch', async () => {
    const groupData = {
      name: 'Test Group',
      description: 'This is a test group.',
      courses: ['Course 1', 'Course 2'],
      majors: ['Major 1', 'Major 2'],
      memberLimit: 10,
      memberCount: 5,
      memberIDs: ['member1', 'member2']
    };

    mock.onGet('/api/groups/1').reply(200, groupData);

    render(
      <MemoryRouter initialEntries={['/groups/1']}>
        <GroupSettings />
      </MemoryRouter>
    );

    // Use findBy to wait for each element individually
    expect(await screen.findByText(/Test Group Settings/i)).toBeInTheDocument();
    expect(await screen.findByText(/This is a test group./i)).toBeInTheDocument();
    expect(await screen.findByText(/Course 1, Course 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Major 1, Major 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Member Limit:/i)).toBeInTheDocument();
    expect(await screen.findByText(/Current Members:/i)).toBeInTheDocument();
    expect(await screen.findByText(/member1/i)).toBeInTheDocument();
    expect(await screen.findByText(/member2/i)).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    mock.onGet('/api/groups/1').reply(500);

    render(
      <MemoryRouter initialEntries={['/groups/1']}>
        <GroupSettings />
      </MemoryRouter>
    );

    expect(await screen.findByText(/error fetching group data/i)).toBeInTheDocument();
  });
});