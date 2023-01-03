import axios from 'axios';
import { Loading } from 'common/Loading';
import useGetUser from 'hooks/useGetUser';
import { useEffect } from 'react';
import { useState } from 'react';
import { Judge as JudgeType } from 'src/generated/graphql';
import styles from './judge.module.css';

interface JudgeProps {
  judge: KitsuUser;
}

export default function Judge({ judge }: JudgeProps) {
  return (
    <li className={styles.judgeItem}>
      <a
        href={`https://kitsu.io/users/${judge.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={judge.avatarImage.views[0]?.url} alt="" />
        <p>{judge.name}</p>
      </a>
    </li>
  );
}
