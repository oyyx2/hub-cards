import { WordLeaf } from "@/components/WordLeaf";
import type { VineLeafLayout } from "@/lib/vineLayout";
import styles from "./vine.module.css";

type VineSegmentProps = {
  leaf: VineLeafLayout;
  growing?: boolean;
  lifted?: boolean;
};

export function VineSegment({
  leaf,
  growing = false,
  lifted = false,
}: VineSegmentProps) {
  const controlX = leaf.stemX + (leaf.attachX - leaf.stemX) * 0.48;
  const controlY = leaf.stemY + (leaf.attachY - leaf.stemY) * 0.22 + leaf.side * -10;

  return (
    <g>
      <path
        className={`${styles.branch} ${growing ? styles.branchNew : ""}`}
        d={`M ${leaf.stemX.toFixed(1)} ${leaf.stemY.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${leaf.attachX.toFixed(1)} ${leaf.attachY.toFixed(1)}`}
      />
      <g transform={`translate(${leaf.attachX.toFixed(1)} ${leaf.attachY.toFixed(1)})`}>
        <g
          className={[
            styles.leaf,
            growing ? styles.leafNew : "",
            lifted ? styles.leafPulse : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <WordLeaf
            kind={leaf.kind}
            color={leaf.color}
            opacity={leaf.opacity}
            veinShift={leaf.veinShift}
            angle={leaf.leafAngle}
            scale={leaf.scale}
          />
        </g>
      </g>
    </g>
  );
}
