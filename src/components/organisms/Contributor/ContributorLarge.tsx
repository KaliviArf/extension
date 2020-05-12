import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Avatar from 'components/molecules/Avatar/Avatar';
import UserName from 'components/atoms/UserName/UserName';
import Stat from 'components/atoms/Stat/Stat';
import StatType from 'components/atoms/Stat/StatType';
import BubbleIcon from 'components/atoms/icons/Bubble';
import { ExternalLink } from 'components/atoms';
import ContributorButton from './ContributorButton';

const ContributorCard = styled.div`
  padding: 12px 15px 20px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 8px;

  ${UserName} {
    margin-bottom: 5px;
  }
`;

const ContributorWrapper = styled.div`
  display: flex;
`;

const ContributorInfos = styled.div`
  margin-left: 15px;
`;

const StatsWrapper = styled.div`
  width: 100%;

  ${BubbleIcon} {
    margin-right: 6px;
  }
`;

interface IntroProps {
  intro: string;
}
const ContributorIntro = styled.div.attrs<IntroProps>(
  ({ intro }: IntroProps) => ({
    dangerouslySetInnerHTML: { __html: intro }
  })
)<IntroProps>`
  margin: 20px 0 0;
  font-size: 15px;
  color: ${props => props.theme.contributorIntro};

  & > p {
    margin: 0;
  }

  a {
    color: ${props => props.theme.activeColor};
  }
`;

interface ContributionExampleProps {
  highlighted?: boolean;
}

const ContributionExample = styled(ExternalLink)<ContributionExampleProps>`
  display: inline-block;
  margin-top: 18px;
  font-size: 12px;
  color: ${props =>
    props.highlighted ? props.theme.highlightedLink : props.theme.activeColor};
  text-transform: uppercase;
`;

interface Props {
  contributor: StatefulContributor;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  showExampleLink?: boolean;
  highlightExampleLink?: boolean;
  showContributionsLink?: boolean;
  className?: string;
}

const ContributorLarge = ({
  contributor,
  onSubscribe,
  onUnsubscribe,
  showExampleLink,
  highlightExampleLink,
  showContributionsLink,
  className
}: Props) => (
  <ContributorCard className={className}>
    <ContributorWrapper>
      <Avatar size="normal" contributor={contributor} />

      <ContributorInfos>
        <UserName>
          <span>{contributor.name}</span>
        </UserName>

        <StatsWrapper>
          <Stat>
            <BubbleIcon /> {contributor.contributions}{' '}
            <StatType>contributions</StatType>
          </Stat>
        </StatsWrapper>

        <ContributorButton
          subscribed={contributor.subscribed}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      </ContributorInfos>
    </ContributorWrapper>

    <ContributorIntro
      intro={contributor.intro || 'Description non renseignée'}
    />

    {showExampleLink && contributor.contribution.example.matchingUrl && (
      <ContributionExample
        href={contributor.contribution.example.matchingUrl}
        highlighted={highlightExampleLink}
      >
        Voir un exemple de ses contributions
      </ContributionExample>
    )}
    {showContributionsLink && (
      <ContributionExample
        href={contributor.contribution.example.matchingUrl}
        highlighted={highlightExampleLink}
      >
        Voir ses contributions
      </ContributionExample>
    )}
  </ContributorCard>
);

ContributorLarge.defaultProps = {
  showExamshowExampleLinkpleLink: false,
  highlightExampleLink: false,
  showContributionsLink: false
};

export default styled(ContributorLarge)``;
