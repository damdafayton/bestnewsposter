import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const CommentCreate = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {

    }, []);

    function onCommentSubmit(e) {
        e.preventDefault()
        console.log(comment)
        console.log('comment going')
        if (localStorage.getItem('token') === null) {
            window.location.replace('/login');
        } else {
            fetch('/api/users/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // setUserEmail(data.email);
                    // setUsername(data.username)
                    // setLoading(false);
                    // console.log(data)
                    let commentObj = { text: comment, user: data.id, newspost: props.postId, replyTo: props.replyTo }
                    console.log(commentObj)
                    return commentObj;
                })
                .then(post => {
                    fetch(`/api/data/comment/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setComment('')
                            if (data.id && !props.mainPage) {
                                //update the replied comment with hasReplies=true value
                                let commentObj = { hasReplies: true }
                                fetch(`/api/data/comment/${props.replyTo}/`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Token ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify(commentObj)
                                }).then(() => {
                                    props.cancelButton()
                                    console.log(props.replyTo, props.postId)
                                    props.onNewComment(props.replyTo, props.postId, true)
                                    // window.location.replace(`/news/${props.postId}`)
                                })
                            } else {
                                props.onNewComment(props.replyTo, props.postId, true)
                                // window.location.replace(`/news/${props.postId}`)
                            }
                        })
                })
        }
    }


    return (
        <form className='mx-1 mt-2 form-group' onSubmit={onCommentSubmit}>
            <textarea
                className='form-control'
                name='comment'
                id='comment'
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows="3" cols="40"></textarea>
            <button className='btn btn-sm btn-primary' type="submit">add comment</button>
            <span> </span>
            {props.mainPage
                ? ''
                : <button className='btn btn-sm btn-danger' onClick={props.cancelButton}>cancel</button>}

        </form>
    )
};

export default CommentCreate;