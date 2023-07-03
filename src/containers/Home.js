import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
// import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import heroImage from "./image/bubble.png";
import { API, Storage } from "aws-amplify";

export default function Home() {
  const [setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
  async function loadNotes() {
    const response = await API.get("notes", "/notes");
    const notesWithAttachmentURL = await Promise.all(
      response.map(async (note) => {
        if (note.attachment) {
          const attachmentURL = await Storage.vault.get(note.attachment);
          return { ...note, attachmentURL };
        }
        return note;
      })
    );

    return notesWithAttachmentURL;
  }

  async function onLoad() {
    if (!isAuthenticated) {
      return;
    }
    try {
      const notes = await loadNotes();
      setNotes(notes);
    } catch (e) {
      onError(e);
    }
    setIsLoading(false);
  }

  onLoad();
}, [isAuthenticated, searchQuery, setNotes, onError]);
    // const filteredNotes = notesWithAttachmentURL.filter((note) =>
    //   note.content.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    const filteredNotes = notesWithAttachmentURL.filter((note) =>
    note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
    setFilteredNotes(filteredNotes);
    return notesWithAttachmentURL;
  }

  function renderNotesList(notes) {
    return (
      <div className="notes-container">
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate custom-note-item custom-note-new">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold custom-note-text">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>

        {/* Sort the notes by createdAt in descending order latest one is in the first */}
        {notes
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(({ noteId, content, createdAt, attachmentURL }) => (
            <LinkContainer key={noteId} to={`/notes/${noteId}`}>
              <ListGroup.Item action className="custom-note-item">
                {attachmentURL && <img src={attachmentURL} alt={`Note Attachment ${noteId}`} />}
                <span className="font-weight-bold">{content.trim().split("\n")[0]}</span>
                <br />
                <span className="text-muted">
                  Created: {new Date(createdAt).toLocaleString()}
                </span>
              </ListGroup.Item>
            </LinkContainer>
          ))}
      </div>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Notes</h1>
        <p className="typewriter" style={{ color: 'black' }}>A simple note taking app</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
        <div className="hero">
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
          <img src={heroImage} alt="bubble" />
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ListGroup>{!isLoading && renderNotesList(filteredNotes)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
